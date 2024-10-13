#!/bin/zsh
for js in dist/fate-npc-card/browser/main-*.js; do
    sed -i -e 's/\/assets/assets/g' $js
done
