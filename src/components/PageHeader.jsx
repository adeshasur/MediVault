export default function PageHeader({ eyebrow, title, description, action }) {
  return <div className="page-head"><div><div className="eyebrow">{eyebrow}</div><h1 className="serif page-title">{title}</h1><p className="page-subtitle">{description}</p></div>{action}</div>;
}
