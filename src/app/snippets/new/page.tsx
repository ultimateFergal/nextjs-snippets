"use client";

import { useActionState, startTransition } from "react";
import * as actions from "@/actions";

export default function SnippetCreatePage() {
  const [formState, action] = useActionState(actions.createSnippet, {
    message: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
}

// In the upcoming lecture we will be implementing the useFormState hook in our code. If you are using Next.js v15, then, you will need to make a slight change to the import and name.

// Change the import from this:

// import { useFormState } from 'react-dom';

// to this:

// import { useActionState } from "react";

// Change the hook name from this:

//   const [formState, action] = useFormState(actions.createSnippet, {

// to this:

//   const [formState, action] = useActionState(actions.createSnippet, {
