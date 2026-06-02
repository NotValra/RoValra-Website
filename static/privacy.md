**Privacy Policy for RoValra Chrome Extension**

**Effective Date:** June 2, 2026

**Introduction**

This Privacy Policy describes how the RoValra Chrome extension ("the Extension") handles user data. We are committed to protecting your privacy and ensuring transparency about our data practices.

<!-- section:information-collection:fas fa-info-circle -->
## Information Collection

To provide a consistent experience across different devices and to enable account-specific features, RoValra collects limited data for all users:

- **No Unnecessary Tracking:** RoValra does **not** track your browsing history on Roblox or any other websites, nor does it log the specific games you visit.

- **General Users (Non-Donators):**
    - **Authentication:** To enable account-linked features (like status bubbles or environments), the extension likely initiates an OAuth session automatically in the background. This process is the primary method used to verify account ownership and ensure secure access to server-side features without requiring manual login.
    - **Stored Data:** We store your **Roblox User ID** and **Username**. This data is necessary to associate your configuration and settings with your account across devices.
    - **User-Set Information:** We store information you explicitly configure within the extension (such as status text, badges, or specific settings) to ensure your preferences persist.

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
## OAuth & Verification Systems

To manage account-linked features, RoValra uses a background authentication system. 

**Terminology:** Within this policy and the extension, the term **"OAuth"** refers collectively to both the **Official Roblox OAuth system** and our **Fallback Authentication method**.

- **Background Processing:** Authentication is performed automatically in the background to ensure features remain active without interrupting your browsing.
- **Token Storage:** For official OAuth, we store an **Access Token** (identity verification) and a **Refresh Token** (session maintenance).
- **Feature Usage:** All users (donators and non-donators) using specific server-side features utilize the same OAuth authentication system to maintain secure sessions and feature access.
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

<!-- section:local-api-key:fas fa-key -->
## Local API Key Generation

To improve compatibility with certain Roblox systems, RoValra may automatically generate a Roblox API key locally on your device.

- **Permissions:** This key is created with **no permissions** and cannot perform actions on your account.
- **Local Usage:** This key is used strictly on your local machine to allow the extension to interact with specific Roblox APIs that require an API key for access. It is never transmitted to RoValra servers or any third parties.


<!-- section:local-storage:fas fa-hdd -->
## Local Storage

RoValra uses your browser's local storage to store stuff and remember your preferences.
- **Configuration:** Your extension settings (toggles, UI choices) are stored locally.
- **Caching:** We may cache public Roblox data (like friend lists or group info) locally to reduce network requests and improve load times.

<!-- section:no-tracking:fas fa-eye-slash -->
## No Tracking or Analytics

We believe in absolute privacy. RoValra does **not** use any analytics suites (like Google Analytics). We do not track your browsing history, your search history on external search engines, or your personal real-world identity. **Crucially, we do not track or log which games you visit on Roblox or any of your on-site activity.**

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
- **Secure Database:** Tokens are stored in a secured, encrypted database. **Roblox User IDs are not encrypted**, as they are public identifiers used to link your account to its specific settings and features.
- **Token Sensitivity:** Tokens are never shared with third parties.
- **No IP Storage:** We do not store your IP address in our database.
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

- **General Users:** User IDs and usernames are retained to maintain persistent settings and ensure functionality of server-side features.
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
