import { Either, left, right, type Result } from "./result";
import type ComponentData from "@/models/componentData";

const baseUrl = "http://localhost:3000";

export async function fetchComponentData(): Promise<Either<ComponentData>> {
  const res = await fetch(`${baseUrl}/api/data`);
  const jsonData = await res.json();
  return validateData(jsonData);
}

async function doRequest(url: string, body: RequestInit | null = null): Promise<Either<string>> {
  let res: Response;
  try {
    res = await (!body ? fetch(url) : fetch(url, body))
  }catch(e){
    let msg;
    if (typeof e === "string") {
        msg = e.toUpperCase()
    } else if (e instanceof Error) {
        msg = e.message 
    }
    return left(msg!);
  }
  const value = await res.text();
  return right(value);
}

export async function fetchComponentTemplate(): Promise<Either<string>> {
  return doRequest(`${baseUrl}/api/template`)
}

export async function sendComponentTemplate(body: string): Promise<Either<string>> {
    return doRequest(`${baseUrl}/api/template`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body
      })
}

function validateData(data: ComponentData): Either<ComponentData> {
  const {title, imageUrl, text} = data;

  if(!title) return left('"title" field is missing')
  if(!imageUrl) return left('"imageUrl" field is missing')
  if(!text) return left('"text" field is missing')

  return right(data);
}
