# coming from neocities?
i started rewriting my site in astro (with react and svelte) recently, and so i renamed the old repository! (you can find it [here](https://github.com/Afterlifepro/neocities-v2))  
if you want to see my progress on the rewrite or offer some advice feel free to have a little nosey!  
the readme below is the pregenerated astro one btw

# Licenses
All code found in this repository is licensed under [GNU GPL v3](COPYING).  
All assets located in `/src/assets/oc/` are licensed under [UK copyright law](https://www.gov.uk/copyright).  
All assets located in `/src/assets/not-oc/` are separated into subfolders and licensed based on a license file in that folder Attribution is also provided to the original author.  
I may not have legal rights over assets stored externally, such as via file hosts or hotlinks. Please see the original creators license for the asset. 


# Installation
To install this repository: ensure Node.JS and pnpm are installed on your machine, then, inside the project directory, run:
```sh
pnpm install
```
This will install all dependencies for the project. Then simply run the following command to open a development server.
```sh
pnpm run dev
```
# Commands
|Command |Usage |
|:--|:--|
|`pnpm run dev`|Run a development server|
|`pnpm run dev-qr`|Run a development server available on your local network and log a QR code which can be scanned to access the site.|
|`pnpm run start`|Synonym of `pnpm run dev`|
|`pnpm run build`|Builds the site to the `/dist/` folder|
|`pnpm run preview`|Preview the contents of `/dist/` as a development server|
|`pnpm run astro`|Append any astro command to then end to run said command.|