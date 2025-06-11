"use client"
import { CrossIcon } from "lucide-react";
import React from "react";
import { siGithub, siX, siIndeed, siGoogle } from "simple-icons/icons";


export const GitHubIcon = ({ className = "" }) => {
    const github = siGithub;

    if (!github) {
        return <CrossIcon className={className} />
    }

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <title>{github.title}</title>
            <path d={github.path} />
        </svg>
    );
}

export const TwitterIcon = ({ className = "" }) => {
    const twitter = siX;


    if (!twitter) {
        return <CrossIcon className={className} />;
    }

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <title>{twitter.title}</title>
            <path d={twitter.path} />
        </svg>
    );
};

export const IndeedIcon = ({ className = "" }) => {
    const linkedin = siIndeed;

    if (!linkedin) {
        return <CrossIcon className={className} />;
    }

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <title>{linkedin.title}</title>
            <path d={linkedin.path} />
        </svg>
    );
};

export const GoogleIcon = ({ className = "" }) => {
    const google = siGoogle;

    if (!google) {
        return <CrossIcon className={className} />;
    }

    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <title>{google.title}</title>
            <path d={google.path} />
        </svg>
    );
};