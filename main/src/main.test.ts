import { describe, expect, jest, test } from '@jest/globals';
import { initDB } from './db';
import { flattenArST } from './parser';
import { applyMakeQueryToDir, initArchGPT, openai } from '.'
import fs, {
  readFileSync, writeFileSync,

} from 'fs'
import { writeFileSyncAndCreateFolderINE } from './util';
import path from 'path';
import { initHypeEdges } from './readWrite';
import { runViaOllama } from './localLLM';
import { runViaOpenAI } from './remoteLLM';
// jest.useFakeTimers()

// describe('test Ollama ', () => {
//   test('simple', async () => {

//     let shouldGo = true

//     setTimeout(() => {
//       shouldGo = false
//     }, 3000)

//     await runViaOllama({
//       llm: "codellama:7b",
//       prompt: "Here is a story about llamas eating grass"
//     }, () => {
//       return {
//         shouldContinue: () => shouldGo,
//         take: (str) => {
//           console.log("str", str);
//         }
//       }
//     })



//   }, 10_000)
// })

// describe('test GPT simple ', () => {
//   test('simple', async () => {


//     let shouldGo = true
//     let buffer = ''
//     setTimeout(() => {
//       shouldGo = false
//     }, 3000)

//     await runViaOpenAI({
//       llm: "gpt-3.5-turbo",
//       prompt: [
//         { role: 'system', content: "hello give me a poem about cats" },
//       ],
//       gptConfig: {
//         max_tokens: 200
//       }
//     }, () => {
//       return {
//         shouldContinue: () => shouldGo,
//         take: (str) => {
//           buffer += str
//         }
//       }
//     })
//     console.log(buffer);

//   }, 10_000)
// })

const folder = path.join(__dirname, '../../example-todo-list/')
console.log("folder", folder);

let archGPT
let ArSTs
// describe('test archGPT basic ', () => {
//   test('init', async () => {

//     archGPT = await initArchGPT(folder, {
//       converDBPathToMatchF_Path: (path: string) => path
//     })

//   }, 100_000);

//   test('search files', async () => {

//     ArSTs = await archGPT.searchFiles("to do list")

//   }, 100_000);

//   test('gpt4 gen', async () => {

//     const description = "allow users to assign a todo item to existing members in a team"

//     const result = await archGPT.runPrompt("CREATE_FILE", {
//       basedOn: ArSTs, description, llm: "gpt-4",
//       gptConfig: {
//         max_tokens: 1,
//       }
//     })
//     expect(result.length).toBeGreaterThan(0)

//   }, 100_000);


//   test('ollama gen', async () => {

//     const description = "allow users to assign a todo item to existing members in a team"

//     const result = await archGPT.runPrompt("CREATE_FILE", {
//       basedOn: ArSTs, description, llm: "ollama",
//       gptConfig: {
//         max_tokens: 1,
//       }
//     })
//     expect(result.length).toBeGreaterThan(0)

//   }, 100_000);
// });




describe('test archGPT template - gpt4-react-tailwind', () => {
  // test('init', async () => {


  //   const archGPT = initArchGPT()

  //   let buffer = ''

  //   const json = { "hello": 4 }

  //   await archGPT.runPrompt("CREATE_FILE", {
  //     id: "test",
  //     savedToHistory: true,
  //     loadPromptTemplate: "gpt4-react-tailwind",
  //     promptTemplateData: {
  //       json
  //     },
  //     gptConfig: {
  //       max_tokens: 20
  //     },
  //     intrepretStream: () => {
  //       return {
  //         shouldContinue: () => true,
  //         take: (str) => {
  //           if (str) {
  //             buffer += str
  //             console.log("[S]", buffer)

  //           }
  //         }
  //       }
  //     }
  //   })
  //   expect(archGPT.history["test"][0].length).toBeGreaterThan(0)
  //   console.log(archGPT.history);

  // }, 100_000)
  test("create file", async () => {


    const archGPT = initArchGPT()


    const json = { "hello": 4 }

    await archGPT.runPrompt("CREATE_FILE", {
      id: "test",
      filePath: "../test-output/hello.tsx",
      savedToHistory: true,
      loadPromptTemplate: "gpt4-react-tailwind",
      promptTemplateData: {
        json
      },
      gptConfig: {
        max_tokens: 20
      }
    })
    // expect file to exist 
    expect(fs.existsSync("../test-output/hello.tsx")).toBe(true)

    // read file and get length
    const fileLength = readFileSync("../test-output/hello.tsx").length
    expect(fileLength).toBeGreaterThan(0)

    // rm file completely 
    fs.unlinkSync("../test-output/hello.tsx")
    // expect file to not exist
    expect(fs.existsSync("../test-output/hello.tsx")).toBe(false)

  }, 100_000)
})

