#!/usr/bin/env sh
# see lp-vue-base/docs/base-setup.rim for usage + original source

script_dir () { (a="/$0"; a=${a%/*}; a=${a:-.}; a=${a#/}; echo "$a"); }

vue_base="$(script_dir)/.."
name="$1"
if [ -z "$name" ]; then echo "no name provided"; sleep 3; exit; fi
vue_base_remote="$(cd "$vue_base" && git remote get-url origin)"
git clone "$vue_base" "$name" && cd "$name"
git remote remove origin
git remote add lp-vue-base-remote "$vue_base_remote"
git remote add lp-vue-base-local "$vue_base"
git checkout -b master
ca_dir="web/container/data/ca"
if [ -d "$vue_base/$ca_dir" ]; then
	mkdir -p "$ca_dir"
	ln "$vue_base/$ca_dir"/* "$ca_dir"/
fi
# copying of node_modules might not work well because of links?
echo 'see lp-vue-base/docs/base-setup.instantiate for next steps'; sleep 3
open $vue_base/docs/setup.rim; exit
