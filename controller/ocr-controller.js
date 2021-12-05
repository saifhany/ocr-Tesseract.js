import { createWorker } from "tesseract.js";

export const ocr = async (request, response) => {
  let img = request.body.img;
  const worker = createWorker({
    logger: (m) => console.log(m),
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage("ara");
    await worker.initialize("ara");
    const {
      data: { text },
    } = await worker.recognize(img);
    response.json({ text });
    console.log(text);
    await worker.terminate();
  })();
};
