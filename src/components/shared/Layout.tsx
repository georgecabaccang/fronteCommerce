import React, { PropsWithChildren } from "react";
import Navigation from "./Navigation";

export default function Layout(props: PropsWithChildren) {
    return (
        <div>
            <Navigation />
            <div>{props.children}</div>
        </div>
    );
}
