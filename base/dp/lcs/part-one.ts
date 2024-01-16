// A longest common subsequence (LCS) is the longest subsequence common to all sequences in a set of sequences (often just two sequences). It differs from the longest common substring: unlike substrings, subsequences are not required to occupy consecutive positions within the original sequences. The problem of computing longest common subsequences is a classic computer science problem, the basis of data comparison programs such as the diff utility, and has applications in computational linguistics and bioinformatics. It is also widely used by revision control systems such as Git for reconciling multiple changes made to a revision-controlled collection of files.
//
// For example, consider the sequences (ABCD) and (ACBAD). They have five length-2 common subsequences: (AB), (AC), (AD), (BD), and (CD); two length-3 common subsequences: (ABD) and (ACD); and no longer common subsequences. So (ABD) and (ACD) are their longest common subsequences.
//
//

// x A B C D
// A 1 1 1 1
// C 1 1 2 2
// B 1 2 2 2
// A 1 2 2 2
// D 1 2 2 3
//
//
// x A G C A T
// G 0 1 1 1 1
// A 1 1 1 2 2
// C 1 1 2 2 2



function lcs_unoptimized(a: string, b: string): number {
  let cache = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1));
  for (let ai = 0; ai < a.length + 1; ai += 1) {
    for (let bi = 0; bi < b.length + 1; bi += 1) {
      if (ai == 0 || bi == 0) {
        cache[ai][bi] = 0
      } else if (a[ai - 1] === b[bi - 1]) {
        cache[ai][bi] = 1 + cache[ai - 1][bi - 1];
      } else {
        cache[ai][bi] = Math.max(
          cache[ai - 1][bi],
          cache[ai][bi - 1]
        );
      }
    }
  }
  return cache[a.length][b.length];
}

function lcs(first: string, second: string): number {
  let a;
  let b;

  if (first.length < second.length) {
    a = second;
    b = first;
  } else {
    a = first;
    b = second;
  }

  let cache = Array.from({ length: 2 }, () => new Array(b.length + 1));
  for (let ai = 0; ai < a.length + 1; ai += 1) {
    for (let bi = 0; bi < b.length + 1; bi += 1) {
      if (ai == 0) {
        cache[0][bi] = 0
      } else if (bi == 0) {
        cache[1][bi] = 0
      } else if (a[ai - 1] === b[bi - 1]) {
        cache[1][bi] = 1 + cache[0][bi - 1];
      } else {
        cache[1][bi] = Math.max(
          cache[0][bi],
          cache[1][bi - 1]
        );
      }
    }
    if (ai > 0) {
      cache.shift();
      cache.push(new Array(b.length + 1));
    }
  }

  return cache[0][b.length];
}


export default lcs;
