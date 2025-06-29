import CodeBlock from "../CodeBlock/CodeBlock";

type TreeNode = {
    name: string,
    comment?: string,
    children: TreeNode[]
}

function recursiveBuild(node: TreeNode, prefix: string = "", isLast: boolean = true): string {
    const branch = prefix + (prefix ? (isLast ? "└── " : "├── ") : "") + node.name + "\n";
    if (!node.children || node.children.length === 0) return branch;

    const childPrefix = prefix + (prefix ? (isLast ? "    " : "│   ") : "");
    const children = node.children.map((child, index) =>
        recursiveBuild(child, childPrefix, index === node.children.length - 1)
    );
    console.log(prefix + (prefix ? (isLast ? "    " : "│   ") : ""));
    // console.log(children);
    // console.log(branch + children.join(""));
    return branch + children.join("");
}

export default function StructureTree({node}: { node: TreeNode }) {
    console.log(recursiveBuild(node));
    return (
        <CodeBlock language="js" code={recursiveBuild(node)} />
    )
}