function Card({ className = "", ...props }) {
  return <div className={`card ${className}`.trim()} {...props} />;
}

function CardHeader({ className = "", ...props }) {
  return <div className={`card-header ${className}`.trim()} {...props} />;
}

function CardTitle({ className = "", ...props }) {
  return <div className={`card-title ${className}`.trim()} {...props} />;
}

function CardDescription({ className = "", ...props }) {
  return <div className={`card-description ${className}`.trim()} {...props} />;
}

function CardAction({ className = "", ...props }) {
  return <div className={`card-action ${className}`.trim()} {...props} />;
}

function CardContent({ className = "", ...props }) {
  return <div className={`card-content ${className}`.trim()} {...props} />;
}

function CardFooter({ className = "", ...props }) {
  return <div className={`card-footer ${className}`.trim()} {...props} />;
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
