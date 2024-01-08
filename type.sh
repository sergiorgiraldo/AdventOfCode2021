#!/bin/sh

variable="/Users/GK47LX/source/AdventOfCode2021/solutions/dayXXX/solution.ts"
parameter="$1"
res="${variable/XXX/$parameter}"

ts-node "$res" 