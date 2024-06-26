import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";  // Change this to switch theme styles

interface IProps {
  language: string;
  children: React.ReactNode;
}

const Code: React.FC<IProps> = ({ language, children }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [language, children]);

  const htmlContent = `
    <pre><code class="language-${language}">${children}</code></pre>
  `;

  return <div className="py-4" dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Code;
