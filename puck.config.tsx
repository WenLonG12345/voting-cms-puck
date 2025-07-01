/* eslint-disable @next/next/no-img-element */
import type { Config } from "@measured/puck";
import clsx from "clsx";

type Props = {
  AppHeader: {
    logoUrl: string;
    logoStyles: Record<string, any>;
    styles?: Record<string, any>;
  };
  Text: { title: string };
  Button: { title: string; url: string };
  Banner: {
    url: string;
    alt: string;
    styles?: Record<string, any>;
  };
};

export const config: Config<Props> = {
  root: {
    
  },
  components: {
    AppHeader: {
      fields: {
        logoUrl: { type: "text" },
        logoStyles: {
          type: "object",
          objectFields: {
            width: { type: "text" },
            height: { type: "text" },
          },
        },
        styles: {
          type: "object",
          objectFields: {
            backgroundColor: { type: "text" },
          },
        },
      },
      defaultProps: {
        logoUrl: "https://via.placeholder.com/150",
        logoStyles: {},
        styles: {},
      },
      render: ({ logoUrl, logoStyles, styles }) => (
        <header style={styles}>
          <img
            src={logoUrl}
            alt="logo"
            style={logoStyles}
          />
        </header>
      ),
    },
    Text: {
      fields: {
        title: { type: "text" },
      },
      defaultProps: {
        title: "Text",
      },
      render: ({ title }) => (
        <div style={{ padding: 64 }}>
          <p>{title}</p>
        </div>
      ),
    },
    Button: {
      fields: {
        title: { type: "text" },
        url: { type: "text" },
      },
      defaultProps: {
        title: "Button",
        url: "#",
      },
      render: ({ title, url }) => (
        <div style={{ padding: 64 }} className="text-center">
          <a href={url} style={{ textDecoration: "none", color: "blue" }}>
            {title}
          </a>
        </div>
      ),
    },

    Banner: {
      fields: {
        url: { type: "text" },
        alt: { type: "text" },
        styles: {
          type: "object",
          objectFields: {
            width: { type: "text" },
            height: { type: "text" },
            borderRadius: { type: "text" },
            boxShadow: { type: "text" },
            margin: { type: "text" },
            padding: { type: "text" },
            backgroundColor: { type: "text" },
            objectFit: { type: "text" },
          },
        },
      },
      defaultProps: {
        url: "https://via.placeholder.com/800x200",
        alt: "banner alt",
        styles: {},
      },
      render: ({ url, alt, styles }) => (
        <img src={url} alt={alt} style={styles} />
      ),
    },
  },
};

export default config;
