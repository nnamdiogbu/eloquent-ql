import { PromptTemplate } from "langchain";
import { datasource, initializedDB } from "../_database";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import { OpenAIChat } from "langchain/llms/openai";

export async function createSqlChain() {
  console.log("creating chain...........................");
  const db = await initializedDB();
  // const data: { table_name: string }[] = await db.query(
  //   "SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public';"
  // );
  // // console.log("data: ", data);
  // const tables = data.filter((d) => d.table_name !== "migrations").map((d) => d.table_name);

  // if (tables.length === 0) throw new Error("no tables found");

  // // console.log("found tables: ", tables);

  const data: { table_name: string; column_name: string }[] = await db.query(
    "SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public';"
  );

  const map = new Map<string, string[]>();

  data.forEach((x) => {
    let columnList = map.get(x.table_name);
    if (columnList) columnList.push(x.column_name);
    else columnList = [x.column_name];
    map.set(x.table_name, columnList);
  });

  const obj = Object.fromEntries(map);

  const template = `
  Previous conversations:
  {history}
  
  Given an input question, first create a syntactically correct {dialect} query to run, then look at the results of the query and return the answer.

  A syntactically correct query has double quotes around table names.

  Only use the following table information from the JSON object where the keys are table names and the values are column names for each table:

  {${JSON.stringify(obj)}} 

  Question: {input}`;

  const prompt = PromptTemplate.fromTemplate(template);

  const database = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
  });

  const chain = new SqlDatabaseChain({
    llm: new OpenAIChat({ temperature: 0, openAIApiKey: process.env.OPENAI_API_KEY }),
    database: database,
    sqlOutputKey: "sql",
    inputKey: "input",
    outputKey: "result",
    prompt,
    topK: 10,
    verbose: true,
  });

  return chain;
}
