import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold text-[#1B4332] mt-12 mb-6">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-[#1B4332] mt-10 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold text-[#1B4332] mt-8 mb-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-6 text-justify leading-relaxed text-[#2D3748]">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="mb-6 space-y-2 ml-0">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 space-y-2 ml-0">{children}</ol>
        ),
        li: ({ children, ordered }) => (
          <li className="flex items-start">
            <span className="text-[#1B4332] mr-2 mt-1.5">
              {ordered ? "•" : "•"}
            </span>
            <span className="flex-1 text-[#2D3748]">{children}</span>
          </li>
        ),
        a: ({ href, children }) => (
          <a 
            href={href} 
            className="text-[#1B4332] hover:underline font-medium" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#1B4332] pl-6 italic my-6 text-[#4A5568]">
            {children}
          </blockquote>
        ),
        pre: ({ children }) => (
          <pre className="bg-[#F7FAFC] p-4 rounded-lg overflow-x-auto my-6 text-[#2D3748]">
            {children}
          </pre>
        ),
        code: ({ children }) => (
          <code className="bg-[#F7FAFC] px-1.5 py-0.5 rounded text-sm text-[#2D3748]">
            {children}
          </code>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
} 