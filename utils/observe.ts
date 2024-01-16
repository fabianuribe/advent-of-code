import { performance, PerformanceObserver } from 'perf_hooks';

interface Stats {
  average: number;
  count: number;
  max: number;
  min: number;
  total: number;
}

function calculateStats(results: PerformanceEntry[]): Stats {
  let min = Infinity;
  let max = -Infinity;
  let total = 0;
  let average = 0;
  for (let entry of results) {
    if (min >= entry.duration) {
      min = entry.duration;
    }
    if (max <= entry.duration) {
      max = entry.duration;
    }
    total += entry.duration;
  }
  average = total / results.length;
  return { average, max, min, total, count: results.length };
}

function observe(fn: (...params: any[]) => any) {
  let performanceEntries: PerformanceEntry[] = [];
  let resolvePerformanceData: (value: PerformanceEntry[] | PromiseLike<PerformanceEntry[]>) => void;

  const performanceDataPromise = new Promise<PerformanceEntry[]>(resolve => {
    resolvePerformanceData = resolve;
  });

  const wrappedFunction = performance.timerify(fn);

  const obs = new PerformanceObserver((list) => {
    performanceEntries = performanceEntries.concat(list.getEntries());
    resolvePerformanceData(performanceEntries);
  });
  obs.observe({ entryTypes: ['function'] });

  const wrappedWithAggregation = (...params: any[]) => wrappedFunction(...params);

  wrappedWithAggregation.getPerformanceData = () => performanceDataPromise.then((entries) => {
    return {
      entries,
      stats: calculateStats(entries)
    }
  });

  return wrappedWithAggregation;
}

export default observe;

