<script lang="ts">
  export let images: {
    src: string;
    alt?: string;
    url?: string;
    accent?: `#${string}`;
  }[] = [];
  export let size = 5;
</script>

<div class="wrapper">
  <div
    class="marquee"
    style={`--size: ${size}rem; --length: ${images.length};`}
  >
    {@html `<!-- loop to make a smooth effect -->`}
    {#each Array(3) as _, i}
      {@html `<!-- loop ${i} -->`}
      {#each images as image}
        {#if i === 0}
          {#if image.url}
            <a href={image.url}
              ><img
                src={image.src}
                alt={image.alt}
                style={`--image-shadow: ${image.accent ?? "#000000"}a0;`}
              /></a
            >
          {:else}
            <img
              src={image.src}
              alt={image.alt}
              style={`--image-shadow: ${image.accent ?? "#000000"}a0;`}
            />
          {/if}
        {:else}
          <div class="extra">
            {#if image.url}
              <a href={image.url}
                ><img
                  src={image.src}
                  alt={image.alt}
                  style={`--image-shadow: ${image.accent ?? "#000000"}a0;`}
                /></a
              >
            {:else}
              <img
                src={image.src}
                alt={image.alt}
                style={`--image-shadow: ${image.accent ?? "#000000"}a0;`}
              />
            {/if}
          </div>
        {/if}
      {/each}
    {/each}
  </div>
</div>

<style>
  .wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  .marquee {
    display: grid;
    width: calc(var(--size) * var(--length));
    height: var(--size);
    grid-auto-flow: column;
    grid-auto-columns: var(--size);
    grid-auto-rows: var(--size);
    align-items: center;
    justify-items: center;

    animation: marquee 15s linear infinite;

    &:hover {
      animation-play-state: paused;
    }

    & img {
      padding: 0.5rem;
      width: var(--size);
      height: var(--size);
      object-fit: contain;
      transition: filter 0.2s ease-in-out, padding 0.2s ease-in-out;
      &:hover {
        filter: drop-shadow(0 0 0.5rem var(--image-shadow, #000000a0));
        padding: 0.25rem;
      }
    }

    & .extra {
      display: contents;
    }



    @media (prefers-reduced-motion: reduce) {
      & {
        animation: none;
        justify-content: center;
        width: 100%;
      }
      & .extra {
        display: none;
      }
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    99.9999% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
