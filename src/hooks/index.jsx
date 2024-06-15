import { UserProvider } from './auth/index.jsx';

const AppProvider = ({ children }) => (
    <>
        <UserProvider>{ children }</UserProvider>
    </>
);

export default AppProvider;