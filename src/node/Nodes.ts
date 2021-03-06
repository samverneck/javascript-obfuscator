import * as escodegen from 'escodegen';
import * as ESTree from 'estree';

import { TStatement } from '../types/node/TStatement';

import { NodeType } from '../enums/NodeType';

export class Nodes {
    /**
     * @param body
     * @returns {ESTree.Program}
     */
    public static getProgramNode (body: TStatement[] = []): ESTree.Program {
        return {
            type: NodeType.Program,
            body,
            sourceType: 'script',
            obfuscated: false
        };
    }

    /**
     * @param operator
     * @param left
     * @param right
     * @returns {ESTree.BinaryExpression}
     */
    public static getBinaryExpressionNode (
        operator: ESTree.BinaryOperator,
        left: ESTree.Expression,
        right: ESTree.Expression,
    ): ESTree.BinaryExpression {
        return {
            type: NodeType.BinaryExpression,
            operator,
            left,
            right,
            obfuscated: false
        };
    }

    /**
     * @param body
     * @returns {ESTree.BlockStatement}
     */
    public static getBlockStatementNode (body: ESTree.Statement[] = []): ESTree.BlockStatement {
        return {
            type: NodeType.BlockStatement,
            body,
            obfuscated: false
        };
    }

    /**
     * @param label
     * @return {ESTree.BreakStatement}
     */
    public static getBreakStatement (label?: ESTree.Identifier): ESTree.BreakStatement {
        const breakStatementNode: ESTree.BreakStatement = {
            type: NodeType.BreakStatement,
            obfuscated: false
        };

        if (label) {
            breakStatementNode.label = label;
        }

        return breakStatementNode;
    }

    /**
     * @param body
     * @returns {ESTree.CatchClause}
     */
    public static getCatchClauseNode (body: ESTree.Statement[] = []): ESTree.CatchClause {
        return {
            type: NodeType.CatchClause,
            param: Nodes.getIdentifierNode('err'),
            body: Nodes.getBlockStatementNode(body),
            obfuscated: false
        };
    }

    /**
     * @param callee
     * @param args
     * @returns {ESTree.CallExpression}
     */
    public static getCallExpressionNode (
        callee: ESTree.Expression,
        args: (ESTree.Expression | ESTree.SpreadElement)[] = []
    ): ESTree.CallExpression {
        return {
            type: NodeType.CallExpression,
            callee,
            arguments: args,
            obfuscated: false
        };
    }

    /**
     * @param expression
     * @returns {ESTree.ExpressionStatement}
     */
    public static getExpressionStatementNode (expression: ESTree.Expression): ESTree.ExpressionStatement {
        return {
            type: NodeType.ExpressionStatement,
            expression,
            obfuscated: false
        };
    }

    /**
     * @param functionName
     * @param params
     * @param body
     * @returns {ESTree.FunctionDeclaration}
     */
    public static getFunctionDeclarationNode (
        functionName: string,
        params: ESTree.Identifier[],
        body: ESTree.BlockStatement
    ): ESTree.FunctionDeclaration {
        return {
            type: NodeType.FunctionDeclaration,
            id: Nodes.getIdentifierNode(functionName),
            params,
            body,
            generator: false,
            obfuscated: false
        };
    }

    /**
     * @param params
     * @param body
     * @returns {ESTree.FunctionExpression}
     */
    public static getFunctionExpressionNode (
        params: ESTree.Identifier[],
        body: ESTree.BlockStatement
    ): ESTree.FunctionExpression {
        return {
            type: NodeType.FunctionExpression,
            params,
            body,
            generator: false,
            obfuscated: false
        };
    }

    /**
     * @param test
     * @param consequent
     * @returns {ESTree.IfStatement}
     */
    public static getIfStatementNode (test: ESTree.Expression, consequent: ESTree.BlockStatement): ESTree.IfStatement {
        return {
            type: NodeType.IfStatement,
            test,
            consequent,
            obfuscated: false
        };
    }

    /**
     * @param name
     * @returns {ESTree.Identifier}
     */
    public static getIdentifierNode (name: string): ESTree.Identifier {
        return {
            type: NodeType.Identifier,
            name,
            obfuscated: false
        };
    }

    /**
     * @param value
     * @returns {ESTree.Literal}
     */
    public static getLiteralNode (value: boolean|number|string): ESTree.Literal {
        return {
            type: NodeType.Literal,
            value,
            raw: `'${value}'`,
            'x-verbatim-property': {
                content: `'${value}'`,
                precedence: escodegen.Precedence.Primary
            },
            obfuscated: false
        };
    }

    /**
     * @param operator
     * @param left
     * @param right
     * @returns {ESTree.LogicalExpression}
     */
    public static getLogicalExpressionNode (
        operator: ESTree.LogicalOperator,
        left: ESTree.Expression,
        right: ESTree.Expression,
    ): ESTree.LogicalExpression {
        return {
            type: NodeType.LogicalExpression,
            operator,
            left,
            right,
            obfuscated: false
        };
    }

    /**
     * @param object
     * @param property
     * @param computed
     * @return {ESTree.MemberExpression}
     */
    public static getMemberExpressionNode (
        object: ESTree.Expression | ESTree.Super,
        property: ESTree.Identifier|ESTree.Literal,
        computed: boolean = false
    ): ESTree.MemberExpression {
        return {
            type: NodeType.MemberExpression,
            computed,
            object,
            property,
            obfuscated: false
        };
    }

    /**
     * @param properties
     * @return {ESTree.ObjectExpression}
     */
    public static getObjectExpressionNode (properties: ESTree.Property[]): ESTree.ObjectExpression {
        return {
            type: NodeType.ObjectExpression,
            properties,
            obfuscated: false
        };
    }

    /**
     * @return {ESTree.Property}
     */
    public static getPropertyNode (
        key: ESTree.Expression,
        value: ESTree.Expression | ESTree.Pattern,
        computed: boolean = false
    ): ESTree.Property {
        return {
            type: NodeType.Property,
            key,
            value,
            kind: 'init',
            method: false,
            shorthand: false,
            computed,
            obfuscated: false
        };
    }

    /**
     * @param operator
     * @param argument
     * @param prefix
     * @returns {ESTree.Literal}
     */
    public static getUnaryExpressionNode (
        operator: ESTree.UnaryOperator,
        argument: ESTree.Expression,
        prefix: boolean = true
    ): ESTree.UnaryExpression {
        return {
            type: NodeType.UnaryExpression,
            operator,
            argument,
            prefix,
            obfuscated: false
        };
    }

    /**
     * @param argument
     * @return {ReturnStatement}
     */
    public static getReturnStatementNode (argument: ESTree.Expression): ESTree.ReturnStatement {
        return {
            type: NodeType.ReturnStatement,
            argument,
            obfuscated: false
        };
    }

    /**
     * @param discriminant
     * @param cases
     * @returns {ESTree.SwitchStatement}
     */
    public static getSwitchStatementNode (
        discriminant: ESTree.Expression,
        cases: ESTree.SwitchCase[]
    ): ESTree.SwitchStatement {
        return {
            type: NodeType.SwitchStatement,
            discriminant,
            cases,
            obfuscated: false
        };
    }

    /**
     * @param test
     * @param consequent
     * @returns {ESTree.SwitchCase}
     */
    public static getSwitchCaseNode (test: ESTree.Expression, consequent: ESTree.Statement[]): ESTree.SwitchCase {
        return {
            type: NodeType.SwitchCase,
            test,
            consequent,
            obfuscated: false
        };
    }

    /**
     * @param declarations
     * @param kind
     * @returns {ESTree.VariableDeclaration}
     */
    public static getVariableDeclarationNode (
        declarations: ESTree.VariableDeclarator[] = [],
        kind: 'var' | 'let' | 'const' = 'var'
    ): ESTree.VariableDeclaration {
        return {
            type: NodeType.VariableDeclaration,
            declarations,
            kind,
            obfuscated: false
        };
    }

    /**
     * @param id
     * @param init
     * @returns {ESTree.VariableDeclarator}
     */
    public static getVariableDeclaratorNode (id: ESTree.Identifier, init: any): ESTree.VariableDeclarator {
        return {
            type: NodeType.VariableDeclarator,
            id,
            init,
            obfuscated: false
        };
    }
}
