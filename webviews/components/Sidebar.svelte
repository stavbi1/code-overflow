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

    const openSettings = () => {
        vscode.postMessage({
            type: 'onOpenSettings',
        });
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
    .settingsButton {
        margin-top: 10px;
        width: fit-content;
        float: right;
        cursor: pointer;
        user-select: none;
    }

    .searchButton {
        margin: 10px 0px 10px 0px;
        width: 70%;
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
    <div class="settingsButton" on:click={openSettings}>⚙️</div>
    <button class="searchButton" on:click={search}>Search Stackoverflow</button>
    <br/>
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