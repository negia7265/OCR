import { createWorker } from "tesseract.js";

(async () => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize("https://i.stack.imgur.com/IvV2y.png");
  console.log(ret.data.text);
  await worker.terminate();
})();
