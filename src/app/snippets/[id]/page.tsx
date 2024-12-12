import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import * as actions from "@/actions";

interface SnippetShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetShowPage(
  props: Readonly<SnippetShowPageProps>
) {
  await new Promise((r) => setTimeout(r, 2000));

  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

// Async Dynamic Params in Next.js 15
// In the upcoming lecture, we will be adding code to fetch a single snippet. In Next.js 15 we must await params or searchParams before accessing.

// Find this code in /src/app/snippets/[id]/page.tsx:

//   const snippet = await db.snippet.findFirst({
//     where: { id: parseInt(props.params.id) },
//   });

// And change it to this:

//   const { id } = await props.params;

//   const snippet = await db.snippet.findFirst({
//     where: { id: parseInt(id) },
//   });

// Also, we need to update the Interface and wrap the params in a Promise:

// interface SnippetShowPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }

// Read more about this in the docs:

// https://nextjs.org/docs/messages/sync-dynamic-apis
