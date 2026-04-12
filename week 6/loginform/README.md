# React App

This is a React application built with Vite and Tailwind CSS.

## Components

- **Greeting**: A simple welcome component that displays a personalized message
- **Counter**: A counter component with increase and decrease buttons
- **Product**: A product card component for displaying product information

## useEffect Hook in React

The `useEffect` hook is a fundamental React hook that allows you to perform side effects in functional components. Side effects include data fetching, subscriptions, manual DOM manipulations, and more.

### Basic Syntax

```jsx
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Side effect code here
    console.log('Component mounted or updated');

    // Optional cleanup function
    return () => {
      console.log('Cleanup function');
    };
  }, [dependencies]); // Dependency array

  return <div>My Component</div>;
}
```

### Key Concepts

1. **Side Effects**: Operations that happen outside of React's render cycle, such as:
   - Fetching data from APIs
   - Setting up subscriptions
   - Manual DOM manipulations
   - Setting timers or intervals
   - Logging

2. **Dependency Array**: The second parameter of `useEffect` that determines when the effect runs:
   - `[]` (empty array): Runs only once after the initial render (componentDidMount equivalent)
   - `[variable]`: Runs when the specified variable changes
   - No dependency array: Runs after every render (use with caution)

3. **Cleanup Function**: The optional return function that cleans up effects:
   - Removes event listeners
   - Cancels subscriptions
   - Clears timers
   - Equivalent to componentWillUnmount

### Common Use Cases

#### 1. Data Fetching

```jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUser(userData);
    };

    fetchUser();
  }, [userId]); // Re-fetch when userId changes

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```

#### 2. Setting up Event Listeners

```jsx
import { useEffect } from 'react';

function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array - only run once

  return <div>Window width: {width}px</div>;
}
```

#### 3. Setting up Timers

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array

  return <div>Seconds: {seconds}</div>;
}
```

### Best Practices

1. **Always include dependencies**: Make sure to include all variables used in the effect in the dependency array
2. **Use multiple useEffect hooks**: Separate different concerns into different useEffect hooks
3. **Cleanup effects**: Always clean up subscriptions, timers, and event listeners
4. **Avoid infinite loops**: Don't update state in useEffect without proper dependencies
5. **Consider useCallback and useMemo**: For expensive operations or to prevent unnecessary re-renders

### Common Pitfalls

1. **Missing dependencies**: Forgetting to include variables in the dependency array
2. **Infinite loops**: Updating state that triggers the effect again
3. **Stale closures**: Accessing outdated values in async operations
4. **Memory leaks**: Not cleaning up effects properly

### Alternatives

- `useLayoutEffect`: Similar to useEffect but runs synchronously after DOM mutations
- `useCallback`: For memoizing functions
- `useMemo`: For memoizing expensive calculations
- Custom hooks: For reusable effect logic

The `useEffect` hook is powerful but should be used thoughtfully to avoid performance issues and bugs. 