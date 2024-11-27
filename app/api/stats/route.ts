import { NextResponse } from "next/server";
import os from "os";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    // CPU Usage
    const cpuLoad = os.loadavg()[0].toFixed(2); // 1-min avg load

    // Battery Status (Optional, for devices with batteries)
    const batteryStatus = await execPromise("upower -i $(upower -e | grep BAT) | grep -E 'percentage|state'");

    // Apache Status
    const { stdout: apacheStatus } = await execPromise("systemctl is-active apache2");

    return NextResponse.json({
      cpuLoad: `${cpuLoad}%`,
      batteryStatus: batteryStatus.stdout || "Not available",
      apacheStatus: apacheStatus.trim() === "active" ? "Running" : "Stopped",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch system stats" }, { status: 500 });
  }
}
