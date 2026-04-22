**Privacy Policy for RoValra Chrome Extension**

**Effective Date:** April 22, 2026

**Introduction**

This Privacy Policy describes how the RoValra Chrome extension ("the Extension") handles user data. We are committed to protecting your privacy and ensuring transparency about our data practices.

<!-- section:information-collection:fas fa-info-circle -->
## Information Collection

Our data collection practices differ based on how you engage with the Extension:

- **General Users (Non-Donators):**
    - By default, RoValra does **not** collect, store, or transmit personally identifiable information (PII).
    - We do not track browsing history, emails, passwords, or names.
    - The Extension primarily interacts with official APIs strictly to retrieve public data.
    - **Temporary Sessions:** For specific one-time actions, non-donators may initiate a temporary OAuth session. This data is stored for a maximum of **30 minutes**. Depending on the action performed, identifying information such as your Roblox User ID may persist in our records to fulfill the specific request.
    - **User-Set Information:** In rare specific feature cases, we may store information you explicitly set (such as status text or specific configuration settings) for non-donators to ensure the functionality of the requested feature.

- **Donators (OAuth and Badge Features):**
    - Data collection occurs **only** after explicit OAuth authentication.
    - **What is stored:**
        - **Roblox User ID:** Used to uniquely identify your account.
        - **Roblox Username:** To display your identity within the extension.
        - **Donation Amount:** To track your contribution tier.
        - **Donator Badge Status:** To remember your toggle preferences.
        - **OAuth Tokens:** Cryptographic keys required to maintain your session.
        - **User-Set Information:** This includes custom status text, environment choices, and other personalized settings configured within the RoValra extension.

<!-- section:oauth-authentication:fas fa-lock -->
## OAuth Authentication & Token Usage
To manage Donator features, users must authenticate using Roblox's official OAuth system.

- **Background Processing:** Authentication operates in the background for a seamless experience.
- **Token Storage:** We store an **Access Token** (identity verification) and a **Refresh Token** (session maintenance).
- **Temporary Usage:** Non-donators using specific features may utilize a short-lived OAuth token that expires and is deleted after 30 minutes.
- **Strict Limitations:**
    - **Read-Only Scope:** Tokens allow us to read public profile data only. They **cannot** spend Robux, change passwords, or trade items.
    - **Low Risk Permissions:**
| Permission            | Description                                                      | Risk Level |
| :-------------------- | :--------------------------------------------------------------- | :--------- |
| **Read User ID**      | View your Roblox User ID to know who you are.                    | **Low**    |
| **Read User Profile** | View your username, display name, user avatar, and profile link. | **Low**    |

<!-- section:fallback-auth:fas fa-sign-in-alt -->
## Fallback Authentication

In the event that the official Roblox OAuth system is unavailable or fails to function, RoValra provides a Fallback Authentication method:

- **Verification Method:** This process involves you favoriting a specific, designated Roblox experience for a few seconds and then unfavoriting it.
- **Purpose:** This action allows our servers to verify your ownership of the account by checking public activity logs.
- **Security:** This method does not require any passwords or sensitive tokens and is used solely to verify account identity when standard OAuth is offline.



<!-- section:optional-data-sharing:fas fa-share-alt -->
## Optional Data Sharing

For certain features, the Extension may send specific non-personal data:
- **Data points:** Transmits only **PlaceIds** and **serverIds**.
- **Purpose:** Used to enhance server-tracking and uptime features.
- **Control:** Completely optional; can be disabled in settings at any time.
- **Privacy:** No data that could link a user to this info is explicitly logged.

<!-- section:user-rights:fas fa-user-shield -->
## User Rights: Access and Erasure

We respect your control over your personal data. If you are a donator and your data is stored in our system, you have the following rights:

- **Right to Access:** You may request a copy of the data we hold (ID, Username, Tier).
- **Right to Erase:** You may request permanent deletion of your data.
    - *Note: This revokes tokens and removes access to Donator Badges.*
- **Contact:** Email **RoValraContact@gmail.com** with subject "Right to Access" or "Right to Erase".

<!-- section:data-security:fas fa-shield-alt -->
## Data Security

We use industry-standard security to protect our users:

- **Local Processing:** For general users, all processing occurs on your local machine.
- **Secure Database:** Donator IDs and tokens are stored in a secured, encrypted database.
- **Token Sensitivity:** Tokens are never shared with third parties.
- **HTTPS:** All API interactions are secured via encrypted HTTPS tunnels.

<!-- section:third-party-services:fas fa-cloud -->
## Third-Party Services

To provide its features, RoValra interacts with several Application Programming Interfaces (APIs):

- **Roblox's APIs:** Essential for the platform interaction and OAuth.
- **RoValra APIs:** Managed by the developer to handle donator records and data support.
- **Cloudflare:** All traffic is routed through Cloudflare for performance and DDoS protection.
- **Infrastructure:** Standard web traffic info (like IP addresses) is processed by Cloudflare to establish secure connections.

<!-- section:data-retention:fas fa-history -->
## Data Retention

- **General Users:** No PII is collected by default. 
- **Temporary Sessions:** Data from temporary OAuth actions (non-donators) is deleted automatically after a maximum of **30 minutes**.
- **Donators:** IDs and tokens are retained indefinitely to maintain badge status unless erasure is requested.

<!-- section:children-privacy:fas fa-child -->
## Children's Privacy

- **COPPA Compliance:** The extension is designed to be compliant with child safety regulations.
- **General Use:** We may store Roblox User IDs and records of actions taken within the extension (such as the visibility of badges or the state of specific RoValra features) for users under 13. This is necessary to maintain feature persistence and consistency across the RoValra ecosystem.

<!-- section:changes:fas fa-sync-alt -->
## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we will update the “Effective Date.” Your continued use of the Extension after any changes signifies your acceptance of the new policy.

<!-- section:contact-information:fas fa-envelope -->
## Contact Information

If you have any questions or concerns about this Privacy Policy, you can contact us at:

RoValraContact@gmail.com
