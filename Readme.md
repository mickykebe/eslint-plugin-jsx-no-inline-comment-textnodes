# Disallow inline comments from being inserted as text nodes

```jsx
function Hello() {
  return <div>// empty div</div>;
}
```

Includes a fix to change the above to

```jsx
function Hello() {
  return <div>{/* empty div */}</div>;
}
```

Only supports inline comments not multiline.
