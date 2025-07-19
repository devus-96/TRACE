export type logType = {
    "timestamp": string,
    "event_type": string,
    "source": string,
    "host.hostname": string,
    "host.ip": string,
    "metrics.cpu_percent": number,
    "metrics.ram_percent": number,
    "metrics.disk_percent": number,
    "log.process_name": string,
    "log.event_id": number,
    "log.level": string,
    "log.message": string,
    "log.user": string,
    "tags": string[]
    }

export type signalType = {
    signal_id: string;
    timestamp: string; // ISO 8601 format
    severity: string; // Assuming these are the possible values based on common usage
    score: number; // A float between 0 and 1
    title: string;
    risk: string; // Could be a specific set of enums if known, otherwise string
    status: string; // Common status values, adjust as needed
    feedback: string; // Common feedback values, adjust as needed
    type: string; // Could be "attack", "alert", etc.
    hostname: string;
    host_ip: string; // Could also use a more specific IP type if a library is available (e.g., 'ip-address')
    user: string;
    source_engines: string[]; // Array of strings for engine names
    rule_id: string | null;
    cluster_id: string | null;
    technique_id: string;
    technique_name: string;
    tactics: string[]; // Array of strings for MITRE ATT&CK tactics
    description: string;
  }