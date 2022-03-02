import { readFile } from "fs/promises";
import express from "express";

export const app = express();
const port = 5000;

let data = JSON.parse(await readFile("KITS_SHIPPING_DATA.json", "utf8"));

app.get("/api/", (req, res) => {
  const label_id = req.query.label_id;
  if (!label_id?.match(/^\d{2}(-\d{0,3}){0,2}$/)) {
    const message = "label_id needs to be XX-XX-XXX where X is an number";
    return res.status(400).json({ error: message });
  }
  if (label_id.length < 3) {
    const message = "label_id needs to be more than 3 characters";
    return res.status(400).json({ error: message });
  }
  let filtered_results = data.filter((item) =>
    item.label_id.startsWith(label_id)
  );
  if (!filtered_results.length) {
    return res.status(404).json();
  }
  res.json({ data: filtered_results });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
