# destinations-alternatives

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Reduce image sizes

```
cd public/assets/images && mogrify -resize 720\> -path ./medium *.{jpg,png} && cd medium && mogrify -resize x480\> *.{jpg,png} && mogrify -quality 80% *.{jpg,png}
```