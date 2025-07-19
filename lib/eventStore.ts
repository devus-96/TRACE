// lib/eventStore.ts
interface Event {
    timestamp: string;
    event_type: string;
    source: string;
    [key: string]: any;
  }
  
  interface MinuteCount {
    timestamp: Date;
    count: number;
  }
  
  class EventStore {
    private events: Event[];
    private minuteCounts: Map<number, number>;
    private readonly maxDataPoints: number;
  
    constructor() {
      this.events = [];
      this.minuteCounts = new Map();
      this.maxDataPoints = 360; // 6 heures * 60 minutes
    }
  
    addEvents(newEvents: Event[]): void {
      const now = new Date();
      this.events.push(...newEvents);
      
      // Mise à jour des comptes par minute
      const currentMinute = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes()
      ).getTime();
  
      const count = this.minuteCounts.get(currentMinute) || 0;
      this.minuteCounts.set(currentMinute, count + newEvents.length);
  
      // Garder seulement les 6 dernières heures
      const sixHoursAgo = now.getTime() - 6 * 60 * 60 * 1000;
      for (const [timestamp] of this.minuteCounts) {
        if (timestamp < sixHoursAgo) {
          this.minuteCounts.delete(timestamp);
        }
      }
    }
  
    getMinuteCounts(): MinuteCount[] {
      // Convertir la Map en tableau trié
      return Array.from(this.minuteCounts.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([timestamp, count]) => ({
          timestamp: new Date(timestamp),
          count
        }));
    }
  }
  
  const eventStore = new EventStore();
  export default eventStore;