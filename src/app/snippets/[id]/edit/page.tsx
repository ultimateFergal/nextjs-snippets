import { notFound } from "next/navigation";
import { db } from "@/db";
import SnippetEditForm from "@/components/snippet-edit-form";

interface SnippetEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetEditPage(
  props: Readonly<SnippetEditPageProps>
) {
  const { id } = await props.params;

  const snippetId = parseInt(id);
  const snippet = await db.snippet.findFirst({
    where: { id: snippetId },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  );
}

// In the upcoming lecture, we will be adding code to edit a snippet. Similar to a required update for Next.js v15 a few lectures ago, we must await params or searchParams before accessing.

// Find this code in src/app/snippets/[id]/edit/page.tsx:

//  const id = parseInt(props.params.id);
//  const snippet = await db.snippet.findFirst({
//    where: { id },
//  });

// And change it to this:

//   const { id } = await props.params;

//   const snippetId = parseInt(id);
//   const snippet = await db.snippet.findFirst({
//     where: { id: snippetId },
//   });

// Also, we need to update the Interface and wrap the params in a Promise:

// interface SnippetEditPageProps {
//   params: Promise<{
//     id: string;
//   }>;
// }
// Read more about this in the docs:

// https://nextjs.org/docs/messages/sync-dynamic-apis

// In the upcoming lecture, we will be installing the Monaco Editor in our project. Next.js 15 now makes use of React v19 by default, which isn't quite compatible with this library.

// When installing you will need to add the --legacy-peer-deps flag:

// npm install @monaco-editor/react --legacy-peer-deps
