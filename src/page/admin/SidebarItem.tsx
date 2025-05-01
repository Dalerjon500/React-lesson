
import { useDrag, useDrop } from 'react-dnd';
import { NavLink } from 'react-router-dom';
import { JSX, useRef } from 'react';

interface SidebarItemProps {
    id: number;
    index: number;
    moveItem: (dragIndex: number, hoverIndex: number) => void;
    to: string;
    icon: JSX.Element;
    label: string;
}

export function SidebarItem({ id, index, moveItem, to, icon, label }: SidebarItemProps) {
    const ref = useRef<HTMLLIElement>(null);

    const [, drag] = useDrag({
        type: "MENU_ITEM",
        item: { id, index },
    });

    const [, drop] = useDrop({
        accept: "MENU_ITEM",
        hover: (draggedItem: { id: number; index: number }) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    drag(drop(ref));

    return (
        <li ref={ref} className="nav-item mb-2">
            <NavLink
                className={({ isActive }) =>
                    isActive ? "active nav-link d-flex align-items-center" : "nav-link text-white d-flex align-items-center"
                }
                to={to}
            >
                {icon}
                <span className="ms-3">{label}</span>
            </NavLink>
        </li>
    );
}
