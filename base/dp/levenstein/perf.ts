import levenstein from "./levenstein";
import observe from "../../../utils/observe";

async function main() {
  let perfLevenstein = observe(levenstein);
  let times = 1000;
  for (let i = 0; i < times; i++) {
    perfLevenstein("pneumonoultramicroscopicsilicovolcanoconiosis", "sisoinoconaclovociliscipocsorcimartluonomuenp");
  }
  const perfData = await perfLevenstein.getPerformanceData();
  console.log(perfData.stats);
}


main().catch(err => {
  console.error(err);
});
