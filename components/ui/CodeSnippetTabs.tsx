"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const snippets = {
  javascript: `import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(
  "https://eth.nodebridge.africa/v1/mainnet",
  {
    headers: {
      Authorization: \`Bearer \${process.env.NODEBRIDGE_API_KEY}\`
    }
  }
);

const blockNumber = await provider.getBlockNumber();
console.log(\`Current block: \${blockNumber}\`);`,
  python: `from web3 import Web3

web3 = Web3(Web3.HTTPProvider(
    "https://eth.nodebridge.africa/v1/mainnet",
    request_kwargs={
        "headers": {
            "Authorization": f"Bearer {os.environ['NODEBRIDGE_API_KEY']}"
        }
    }
))

block_number = web3.eth.block_number
print(f"Current block: {block_number}")`,
  curl: `curl https://eth.nodebridge.africa/v1/mainnet \\
  -X POST \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $NODEBRIDGE_API_KEY" \\
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'`,
};

export function CodeSnippetTabs() {
  const [activeTab, setActiveTab] = useState("javascript");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(snippets[activeTab as keyof typeof snippets]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="javascript" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-background/95 border border-border/50">
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="curl">cURL</TabsTrigger>
          </TabsList>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-xs gap-1.5"
          >
            <Copy className="h-3 w-3" />
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        {Object.entries(snippets).map(([lang, code]) => (
          <TabsContent key={lang} value={lang} className="mt-0">
            <div className="relative">
              <pre className="p-4 rounded-lg bg-black/50 border border-border/50 overflow-x-auto">
                <code className="text-sm text-left font-mono text-white/90">{code}</code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}