import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
body {{background: ${({ theme }) => theme.body};
color:  ${({ theme }) => theme.text};
}
.post-container {
    background ${({ theme }) => theme.primary};
   
}

.trending-container {
    background ${({ theme }) => theme.primary};
   
}
#message  {
    background ${({ theme }) => theme.body};
    color ${({ theme }) => theme.text};
   
}

.card-right, h3, h5 {
    color ${({ theme }) => theme.text};
}

.trending {
    color ${({ theme }) => theme.text};

   
}

nav {
    box-shadow  ${({ theme }) => theme.shadow};

 
 
`;

export const lightTheme = {
    body: "#E4E4E4",
    text: "#000612",
    text2: "#000612",
    primary: "#FFFFFF ",
    content: "#e0faff",
    shadow: "1px 13px 6px -10px rgba(0, 0, 0, 0.7)",
};

export const darkTheme = {
    body: "#000612",
    text: "#FFFFFF",
    text2: "#000612",
    primary: "#0F192B",
    content: "#16233B",
    shadow: "1px 13px 6px -10px rgba(240,240,240,0.7)",
};
