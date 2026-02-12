import { useState } from "react";
import * as React from "react";

type CollapsibleSectionProps = {
    title: string;
    children: React.ReactNode;
    hasContent: boolean;
};

export function CollapsibleSection({ title, children, hasContent }: CollapsibleSectionProps) {
    const [open, setOpen] = useState(true);

    if (!hasContent) {
        return (
            <div className="card">
                <h2>{title}</h2>
                <p>Brak danych</p>
            </div>
        );
    }

    return (
        <div className="card">
            <h2
                onClick={() => setOpen(!open)}
                style={{ cursor: "pointer", userSelect: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                {title} <span>{open ? "▼" : "►"}</span>
            </h2>
            {open && <div>{children}</div>}
        </div>
    );
}