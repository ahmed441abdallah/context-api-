# React Context API: A Comprehensive Guide

The **React Context API** is a powerful feature for managing global state and passing data through the component tree without relying on props drilling.

---

## 🌟 Features
- Avoids **prop drilling** by providing global state.
- Perfect for managing themes, authentication, or app-wide configurations.
- Built-in solution with no external dependencies.

---

## 📚 Table of Contents

- [Introduction](#introduction)
- [When to Use Context API](#when-to-use-context-api)
- [How Context API Works](#how-context-api-works)
- [Getting Started](#getting-started)
  - [Step 1: Create Context](#step-1-create-context)
  - [Step 2: Create a Provider](#step-2-create-a-provider)
  - [Step 3: Consume the Context](#step-3-consume-the-context)
- [Best Practices](#best-practices)
- [Limitations](#limitations)
- [Resources](#resources)

---

## 📖 Introduction

The **React Context API** provides a way to share values like state or functions across the component tree without explicitly passing them through every component. It simplifies state management, especially for medium-sized applications.

---

## 🔧 When to Use Context API

Use the Context API when:
- You need **global state** shared between deeply nested components.
- **Prop drilling** becomes unmanageable.
- Examples: Themes, user authentication, or app-wide configurations.

Do **not** use Context API for frequent state updates (e.g., animations) as it can lead to performance issues.

---

## 🚀 How Context API Works

1. **Context Creation**: Create a context object using `React.createContext`.
2. **Provider**: Wrap your component tree with the `Provider` to pass the state or functions.
3. **Consumer**: Access the context value using `useContext` (hook) or `Context.Consumer`.

---

## 🛠️ Getting Started

### **Step 1: Create Context**

Create a new file for the context.

```jsx
// ThemeContext.js
import { createContext } from 'react';

const ThemeContext = createContext();

export default ThemeContext;
// ThemeProvider.js
import { useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
