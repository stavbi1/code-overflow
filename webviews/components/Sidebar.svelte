<script lang="ts">
    import type { Item } from "../types/searchResultTypes";

    let items: Item[] = [];

    //@ts-ignore
    const vscode = acquireVsCodeApi();
    const search = () => {
        vscode.postMessage({
            type: 'onSearch'
        })
    };

    window.addEventListener('message', event => {
        const message = event.data; // The JSON data our extension sent

        switch (message.type) {
            case 'searchResult':
                items = message.value;
                break;
        }
    });
</script>

<style>
    .searchButton {
        margin: 10px 0px 10px 0px;
    }

    .lastResultsTitle {
        font-size: 1.3em;
    }

    .link {
        color: inherit;
        text-decoration: none;
    }
</style>

<div>
    <button class="searchButton" on:click={search}>Search Stackoverflow</button>
    {#if items.length > 0}
        <span class="lastResultsTitle">Last search results:</span>
        <ul>
        {#each items as item}
            <li>
                <a class="link" href={item.link}>
                    {item.title}
                </a>
            </li>
        {/each}
        </ul>
    {/if}
</div>