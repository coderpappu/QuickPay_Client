import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import React, { useEffect } from "react";

// Custom plugin to set initial text from JSON node
function SetInitialTextFromJSONPlugin({ initialJSON }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      root.clear();

      // Parse the JSON and create nodes
      initialJSON.root.children.forEach((node) => {
        if (node.type === "paragraph") {
          const paragraphNode = $createParagraphNode();
          node.children.forEach((textNode) => {
            if (textNode.type === "text") {
              const lexicalTextNode = $createTextNode(textNode.text);
              paragraphNode.append(lexicalTextNode);
            }
          });
          root.append(paragraphNode);
        }
      });
    });
  }, [editor, initialJSON]);

  return null;
}

// Editor configuration
const editorConfig = {
  namespace: "MyEditor",
  theme: {
    // Add your custom theme styles here
  },
  onError: (error) => {
    console.error(error);
  },
};

// Main Editor Component
export default function LexicalEditor({ initialJSON }) {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <HistoryPlugin />
      <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
      <SetInitialTextFromJSONPlugin initialJSON={initialJSON} />
    </LexicalComposer>
  );
}
