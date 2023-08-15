# web3-blockchain-crowdfunding-platform

## 이슈, 버그, 개선 (Issues, Debugging, Features)
Aug 15, 2023
- [Error] Cannot find namespace 'StateContext'.ts(2503)
- [Solution] To solve the "Cannot find namespace context" error in React typescript, use a .tsx extension for the files in which you use JSX, set jsx to react-jsx in your tsconfig.json file and make sure to install all of the necessary @types packages for your application. (.ts 익스텐션을 .tsx로 변경하여 해결)
- [Source] https://bobbyhadz.com/blog/react-cannot-find-namespace-context
