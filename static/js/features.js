
var featuresData = {
    Catalog: {
        title: "Catalog",
        settings: {
            itemSalesEnabled: {
                label: "Enable Item Sales",
                description: ["This shows the most up to date sales and revenue data we have.", 
                            "The sales data is very likely to be inaccurate on items that are for sale, but very likely to be correct on off sale items.",
                        "Keep in mind this was leaked data from around half a year ago. A lot of data is inaccurate and a lot of items dont have data."],
                type: "checkbox",
                default: true
            },
            hiddenCatalogEnabled: {
                label: "Enable Hidden Catalog",
                description: ["Shows Roblox made items before they are on the official catalog.",
                    "{{red WARNING}} Roblox patched this, but then unpatched it, so it might get patched again at any point."
                ],
                type: "checkbox",
                default: false
            }
        }
    },
    Games: {
        title: "Games",
        settings: {

            PreferredRegionEnabled: {
                label: "Enable Preferred Region Play Button",
                description: ["This adds a play button that joins your preferred region.",
                            "This also automatically serverhops",
                        "If you have this enabled and Quick Play Button there will be a Preferred Region quick play button "],
                type: "checkbox",
                default: true,
                childSettings: {
                    robloxPreferredRegion: {
                        label: "Preferred Region",
                        description: ["Select your preferred region for joining games."],
                        type: "select",
                        options: "REGIONS",
                        default: "AUTO"
                    }
                }
            },
            QuickPlayEnable: {
                label: "Enable Quick Play Button",
                description: ["This will add a quick play button to games so you can quickly join the game without opening the game page.",
                    "If you have Preferred Region Play Button enabled it will also add a Preferred Region quick play button to quickly join your preferred region.",
                    "This is made to look like the Official Roblox Clients quick play button."
                ],
                type: "checkbox",
                default: true,
            },
            botdataEnabled: {
                label: "Enable Bot Data",
                description: ["Shows if a game has a lot of bots in the description of the game.",
                            "It doesn't show the amount of bots, since the sample size is too small to give an accurate number."],
                type: "checkbox",
                default: true
            },
            subplacesEnabled: {
                label: "Enable Subplaces",
                description: ["Shows the subplaces of a game."],
                type: "checkbox",
                default: true
            },
            TotalServersEnabled: { 
                label: "Enable Total Servers",
                description: ["This shows the total amount of servers a game has."],
                type: "checkbox",
                default: true
            },
            GameVersionEnabled: {
                label: "Enable Game version",
                description: ["This shows the current version a game is on.",
                    "Useful for developers."
                ],
                type: "checkbox",
                default: true
            },
            OldestVersionEnabled: {
                label: "Enable Oldest Server Version",
                description: ["This shows the oldest game version that servers are still running on.",
                    "Useful for developers."
                ],
                type: "checkbox",
                default: true
            },
            ServerFilterEnabled: {
                label: "Enable Server Filters",
                description: ["This adds a filter to the server list.",
                     "allowing you to filter servers by region, uptime and server size.",
                    "**It is highly recommended that the 'Server List Modifications' setting is enabled for this to work correctly.**"],
                type: "checkbox",
                default: true,
            },
            ServerlistmodificationsEnabled: {
                label: "Enable Server List Modifications",
                description: ["This adds all of these different features to the server list:",
                    "- Server Uptime Estimation",
                    "- Server Version",
                    "- Server Region",
                    "- Queue Size",
                    "- Invite Link",
                    "- Full Serverid",
                    "- And all the previous mentioned modifications also apply to the 'Servers My Friends are in'",
                    "When this is enabled it will remove the following features from other extensions:",
                    "- RoPro Share Button",
                    "- RoPro Server Uptime (RoPro Plus)",
                    "- RoPro Server Location (RoPro Plus)",
                    "These features were removed to prevent conflicts with RoValra.",
                    "RoSeal 2.1s server list will overwrite this feature since it does basically the same.",
                ], 
                type: "checkbox",
                default: true,

            },
            PrivateQuickLinkCopy: {
                label: "Enable Quick Private server link copy and genarating.",
                description: ["{{orange This feature has been disabled for maintenance}}",
                    "This allows you to quickly copy a private server link or genarate a new private server link"
                ]
            }
        }
    },
    Profile: {
        title: "Profile",
        settings: {
            userGamesEnabled: {
                label: "Enable Hidden User Games",
                description: ["Shows a users hidden games on their profile."],
                type: "checkbox",
                default: true
            },
            userSniperEnabled: {
                label: "Enable Instant Joiner",
                description: ["This joins a user instantly when they go into a game, best used for people with a lot of people trying to join them.",
                            "### Requirements",
                            "- It is **strongly recommended** that you uninstall the Microsoft Store version of Roblox",
                            "- This feature requires the user to be friends with you or have their joins enabled"
                           ],
                type: "checkbox",
                default: true
            },
            PrivateServerBulkEnabled: {
                label: "Enable Private Server bulk Removal",
                description: ["This will add a toggle to the private server inventory tab that allows you to easily set a bunch of private servers as inactive",
                    "This also works for setting inactive private servers as active"
                ],
                type: "checkbox",
                default: true
            },
            privateInventoryEnabled: {
                label: "Enable Private Inventory Viewer",
                description: ["This allows you to view a users private inventory, by scanning a lot of items at once, to check if they own them."],
                type: "checkbox",
                default: true,
            },
            RoValraBadgesEnable: {
                label: "Enable RoValra Badges",
                description: ["This adds custom RoValra related badges to the Roblox Badges for specific users profiles",
                    "The list of users will expand, this is mostly just a silly feature."
                ],
                type: "checkbox",
                defautl: true,
            }
        }
    },
    Communities: {
        title: "Communities",
        settings: {
            groupGamesEnabled: {
                label: "Enable Hidden Community Games",
                description: ["Shows a communities hidden games."],
                type: "checkbox",
                default: true
            },
            pendingRobuxEnabled: {
                label: "Enable Unpending Robux",
                description: ["Shows an estimate of how many pending Robux will stop pending within 24 hours.",],
                type: "checkbox",
                default: true
            }
        }
    },
    Avatar: {
        title: "Avatar",
        settings: {
            forceR6Enabled: {
                label: "Remove R6 Warning",
                description: ["Removes the R6 warning when switching to R6"],
                type: "checkbox",
                default: true
            }
        }
    },
    Miscellaneous: {
        title: "Miscellaneous",
        settings: {
            ServerdataEnabled: {
                label: "Send Server Ids And Place Ids To RoValras Api",
                description: ["This feature sends server ids and place ids to RoValras api, when you browse the site.",
                    "This data is used for the server uptime and the Total Servers features.",
                    "Leaving this feature on will help improve the Server Uptime and Total Servers features.",
                    "**No personal data is sent, not even user id or username, only the server ids and the place id.**",
                    "**No data that can be used to link the server ids / place ids to you is sent or logged.**"
                ],
                type: "checkbox",
                default: true
            },
            cssfixesEnabled: {
                label: "Enable CSS Fixes",
                description: ["This feature has CSS fixes for the Roblox website.",
                    "CSS fixes this feature does:",
                    "- Fixes the avatar icon on profile getting squished.",
                    "More to come when I notice some issues that annoys me :)"
                ],

                type: "checkbox",
                default: true
            },
            pendingrobuxtrans: {

                label: "Enable Unpending Robux Transactions",
                description: ["This estimates how many Robux will stop pending in 24 hours.",
                    "This feature is experimental since I couldnt test it myself but it should work fine."
                ],

                type: "checkbox",
                default: true
            },
            revertLogo: {
                label: "Change the app launching icon",
                description: ["This changes the icon that shows when you join a game.",
                    "Old icon is the icon it had before they changed it to the new app client icon.",
                    "And ofc custom icon is any image you want."
                ],
                type: "select",
                options: [
                    { value: 'NEW', label: 'Off' },
                    { value: 'OLD', label: 'Old icon' },
                    { value: 'CUSTOM', label: 'Custom icon' }
                ],
                default: 'NEW'
            },
            customLogoData: {
                label: "Custom icon",
                description: ["Upload your custom image."],
                type: "file",
                default: null
            }
            
        }
        
    },
    FunStuff: {
        title: "Fun Stuff",
        settings: {
            bandurationsEnabled: {
                label: "All possible ban durations",
                
                description: [
"**This does not include voice chat bans.**",
"**Any text saying 'Note:' is a note added by Valra to explain stuff better.**",
"- Banned for 1 Day",
"- Banned for 3 Days",
"- Banned for 7 Days",
"- Banned for 14 Days",
"- Account Deleted",
"• Warning",
"• Banned for 6 Months",
"• Banned for 1 Year",
"• Note: the stuff below are not bans but instead Roblox telling you what will happen if you do it again, this doesn't always show when you get banned.",
"• This stuff below is called a 'Forshadow ban'",
"• If you violate the Community Standards again, your account may be suspended in the future. ",
"• If you violate the Community Standards again, your account may be suspended for at least 1 day.",
"• If you violate the Community Standards again, your account may be suspended for at least 3 days.",
"• If you violate the Community Standards again, your account may be suspended for at least 7 days.",
"• If you violate the Community Standards again, your account may be permanently banned from Roblox.",
"- Note: 2 days, 1 hour, 3 hours, 6 hours and 12 hours bans might not be in use.",
"• Banned for 2 Days",
"• Banned for 3 Hours",
"• Banned for 6 Hours",
"• Banned for 12 Hours",
"• Banned for 1 Hour",
"• Account Terminated",
"• Banned for 60 Days",],
                    default: null,
                },
                
            
           BanReasons: {
                label: "All possible ban reasons on Roblox, some ban reasons have been censored by Valra.",
                description: [
"**All ban reasons are 100% confirmed**",
"**Keep in mind these are ban reasons, which is basically categories each ban might fall into.**",
"**Any text saying 'Note:' is a note added by Valra to explain stuff better.**",
"- None (Note: Likely used for when there isnt a ban reason, and instead only a moderator note.)",
"- Profanity",
"- Harassment",
"- Spam",
"- Advertisement",
"• Scamming",
"• Adult Content",
"• Inappropriate",
"• Privacy",
"• Unclassified Mild",
"• BlockedContent",
"• Minor Swearing",
"• Distorted Audio",
"• Loud Earbleeders",
"• Players Screaming into Microphone",
"• Swearing",
"• P####graphic Sounds",
"• Explicit S##ual References and Innuendo",
"• Dr## and Alc###l References",
"• Discriminatory or N##i Content",
"• Dating Imagery",
"• Discriminatory Content",
"• Dr##s, Alc###l",
"• DMCA",
"• Explicit N####y/P##n",
"• Gang Images",
"• N###s",
"• Personal Attack/Harassment/Bullying",
"• Red Armbands (Not N###s) ",
"• Suggestive/S##ualized Imagery",
"• S####de/Self-####",
"• Clickbait Ads",
"• Inappropriate Content",
"• Not Related to Roblox",
"• Off-Site Links",
"• Hidden Message Clothing",
"• None of the Above",
"• Account Theft",
"• Asset Ownership",
"• Billing",
"• Compromised Account",
"• Copyright/DMCA",
"• Derogatory/Harassment",
"• Depressive",
"• Discriminatory",
"• Exploiting",
"• Text Filter / Profanity",
"• Gr###ing",
"• Illicit Substance",
"• Malicious",
"• Misleading",
"• Dating",
"• Phishing/Scam",
"• Real Info",
"• RMT (Note: Real money transaction)",
"• S##ual/Adult Content",
"• Shock",
"• Threats",
"• Real-Life Tragedy",
"• Politics",
"• Encouraging Dangerous Behavior",
"• Other",
"• Dating and Romantic Content",
"• S##ual Content",
"• Directing Users Off-Platform",
"• Privacy: Asking for PII",
"• Privacy: Giving PII",
"• Impersonation",
"• Extortion and Blackmail",
"• Illegal and Regulated Content",
"• Misusing Roblox Systems",
"• Political Content",
"• T###orism/Extremism",
"• Child Endangerment",
"• Real-Life Threats",
"• Cheat and Exploits",
"• Seeking S##ual Content",
"• Disruptive Audio",
"• Contests and Sweepstakes",
"• Threats or Abuse of Roblox Employees or Affiliates",
"• Roblox Economy",
"• IRL Dangerous Activities",
"• Intellectual Property Violation",
"• Off Platform Speech and Behavior",
"• Violent Content and Gore",
"• Advertising",
"• Chargeback",
"• DMCA Early Legal Strike",
"• DMCA Final Legal Strike",
"• You created or used an account to avoid an enforcement action taken against another account determined from your account information, such as your account email, phone number, or other information (Note: This is not a ban reason this is a modarator note)",
"• Trademark Violation",
"• Roblox does not permit using third-parties to buy, sell, or trade Robux, promotional codes that falsely appear to be from Roblox Corporation, or inappropriate use of the community payout system. (Note: This is not a ban reason this is a modarator note)",
"- Note: Fun fact the 'using third-parties to buy, sell, or trade Robux' modarator are called 'Virtual Casino' bans in the code"],
               
                default: null
            },
            appealstuff: {
            label: "Appeals related stuff",
            description: ["**Appeal Outcomes & Decisions**",
                "- Appeal denied",
"- We have reviewed your appeal. This activity is still in violation of Roblox Community Standards.",
"- Appeal accepted",
"- We have reviewed your appeal. This activity is not in violation of Roblox Community Standards. Any consequence related to this activity is reversed.",
"- We have reviewed your appeal. This activity is still in violation of Roblox Community Standards. However, we’ve updated the violation category.",
"**Appeal Instructions & Information**",
"- Appeal something not shown",
"- Request Appeal",
"- Additional info (optional)",
"- You can appeal by {date}",
"- View past violations and manage your appeals. All content and behavior must adhere to the {link}Roblox Community\nStandards{linkEnd}.",
"- Reviews are based on {link}Roblox Community Standards{linkEnd}",
"- Learn more about appeals {link}here{linkEnd}.",
"**Error Messages & Support Fallbacks**",
"- Appeals information not found",
"- If you would like to appeal something not shown here please visit {link}Support{linkEnd}",
"- You've reached the maximum number of appeals. You may no longer appeal this {assetType}."
],
            default: null,
        },
            captcha: {
                label: "All the places where you can get a captcha on Roblox",
                description: ["Roblox im still mad that you denied my captcha bypass just to fix it a few weeks later 😡😡😡😡😡"
                ,"- sign up"
                , "- login"
                , "- change password"
                , "- redeeming a gift card"
                , "- submitting a support ticket"
                , "- buying an item (speculation, might have been removed)"
                , "- posting on a group wall (likely gonna be the same for group forum posts)"
                , "- joining a group"
                , "- 'generic challange' no idea what they mean by that."
                , "- following a user"
                , "- uploading 'clothing asset' could also be the same for any asset but im unsure"
                , "- posting a comment on an asset (comments on assets have been removed)"
                ],
                default: null
            }
            
        }
        
    }
}