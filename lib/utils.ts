import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const dataLogs = [
  {
    "timestamp": "2025-06-27T12:01:29.734Z",
    "event_type": "log",
    "source": "windows_system_log",
    "host.hostname": "DESKTOP-SEC1",
    "host.ip": "192.168.1.12",
    "metrics.cpu_percent": 2,
    "metrics.ram_percent": 40,
    "metrics.disk_percent": 10,
    "log.process_name": "powershell.exe",
    "log.event_id": 4688,
    "log.level": "information",
    "log.message": "A new process was created",
    "log.user": "ADMIN-PC\\manuela",
    "tags": ["system", "process", "windows"]
    },
    {
      "timestamp": "2025-06-27T12:05:12.500Z",
      "event_type": "app",
      "source": "nodejs_api",
      "host.hostname": "api-server-1",
      "host.ip": "10.0.0.5",
      "metrics.cpu_percent": 12,
      "metrics.ram_percent": 65,
      "metrics.disk_percent": 55,
      "log.process_name": "node",
      "log.event_id": 2001,
      "log.level": "error",
      "log.message": "Database connection timeout",
      "log.user": "service-account",
      "tags": ["backend", "database", "error"]
    },
    {
      "timestamp": "2025-06-27T12:10:45.100Z",
      "event_type": "metric",
      "source": "prometheus_exporter",
      "host.hostname": "monitoring-node-2",
      "host.ip": "10.0.0.20",
      "metrics.cpu_percent": 85,
      "metrics.ram_percent": 90,
      "metrics.disk_percent": 75,
      "log.process_name": "node_exporter",
      "log.event_id": 3002,
      "log.level": "warning",
      "log.message": "High resource usage detected",
      "log.user": "system",
      "tags": ["metrics", "resource", "alert"]
      },
      {
        "timestamp": "2025-06-27T12:15:05.777Z",
        "event_type": "network",
        "source": "nginx_access_log",
        "host.hostname": "frontend-proxy-1",
        "host.ip": "10.0.0.10",
        "metrics.cpu_percent": 5,
        "metrics.ram_percent": 35,
        "metrics.disk_percent": 20,
        "log.process_name": "nginx",
        "log.event_id": 404,
        "log.level": "information",
        "log.message": "GET /favicon.ico returned 404",
        "log.user": "-",
        "tags": ["http", "nginx", "access"]
      },
      {
        "timestamp": "2025-06-27T12:20:00.000Z",
        "event_type": "security",
        "source": "auditd",
        "host.hostname": "linux-sec-node",
        "host.ip": "10.0.0.25",
        "metrics.cpu_percent": 0,
        "metrics.ram_percent": 25,
        "metrics.disk_percent": 15,
        "log.process_name": "sshd",
        "log.event_id": 1006,
        "log.level": "warning",
        "log.message": "Failed SSH login attempt",
        "log.user": "unknown",
        "tags": ["security", "ssh", "alert"]
      },
      {
        "timestamp": "2025-06-27T12:25:59.300Z",
        "event_type": "app",
        "source": "react_frontend",
        "host.hostname": "web-client-2",
        "host.ip": "10.0.0.30",
        "metrics.cpu_percent": 1,
        "metrics.ram_percent": 20,
        "metrics.disk_percent": 5,
        "log.process_name": "chrome",
        "log.event_id": 5001,
        "log.level": "error",
        "log.message": "Unhandled JavaScript exception",
        "log.user": "anonymous",
        "tags": ["frontend", "js", "error"]
      },
      {
        "timestamp": "2025-06-27T12:30:15.888Z",
        "event_type": "system",
        "source": "linux_syslog",
        "host.hostname": "backend-db-1",
        "host.ip": "10.0.0.35",
        "metrics.cpu_percent": 10,
        "metrics.ram_percent": 50,
        "metrics.disk_percent": 45,
        "log.process_name": "postgres",
        "log.event_id": 6002,
        "log.level": "information",
        "log.message": "Scheduled backup completed successfully",
        "log.user": "postgres",
        "tags": ["database", "backup", "maintenance"]
      }
]