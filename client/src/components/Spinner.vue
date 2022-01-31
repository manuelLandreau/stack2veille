<template>
    <div class="load">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
</template>

<style scoped>
.line {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 15px;
    background-color: white;
}

.load .line:nth-last-child(1) {
    animation: loading 0.6s 0.1s linear infinite;
}
.load .line:nth-last-child(2) {
    animation: loading 0.6s 0.2s linear infinite;
}
.load .line:nth-last-child(3) {
    animation: loading 0.6s 0.3s linear infinite;
}

@keyframes loading {
    0% {
        transform: translate(0, 0);
    }
    50% {
        transform: translate(0, 15px);
    }
    100% {
        transform: translate(0, 0);
    }
}
</style>