<template>
  <div class="NewNetwork">
    <div class="header">          
        <h1>New transportation network</h1>
        <p>Scene 1</p>
    </div>
    <section class="new-network">
        <div class="grid input-name">
            <h2>Name your network</h2>
            <input type="text" class="text-left" placeholder="Can't be empty"/>
        </div>
    </section>
    <section class="network-information">
        <h2>Transport network information</h2>
        <div class="subtitle">
            <div class="grid">
                <h4>Add details of each transit line</h4>
                <a class="icon-link"><span class="material-icons">help</span></a>
            </div>
        </div>
        <div class="line-details">
            <div>
                <div class="grid search-bar">
                    <input type="search"/>
                    <button class="btn neuro" disabled>
                        <span class="material-icons">visibility</span>
                        <span>View all</span>
                    </button>
                </div>
                <div class="empty-box">
                    <p>There is no defined route in this network. You can add a new one or create predefined tours</p>
                    <div class="grid">
                        <button class="btn">
                            <span class="material-icons">add</span>
                            <span>Add transit line</span>
                        </button>
                        <button class="btn">
                            <span>Add default travels</span>
                            <span class="material-icons">format_list_bulleted</span>
                        </button>
                    </div>
                </div>
                <div class="linebox-container">
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon" alt="Show"><span class="material-icons">visibility_off</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon active" alt="Show all"><span class="material-icons">vignette</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim open">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="linebox">
                        <div class="linebox-header">
                            <div class="line-input">
                                <h4>Line ID</h4>
                                <input type="text">
                            </div>
                            <div class="line-input">
                                <h4>Mode</h4>
                                <select>
                                    <option selected>bus 1</option>
                                    <option>metro 1</option>
                                </select>
                            </div>
                            <div class="grid min">
                                <button class="btn icon active" alt="Show all"><span class="material-icons">vignette</span></button>
                                <button class="btn icon" alt="Open"><span class="material-icons">arrow_drop_down</span></button>
                            </div>
                        </div>
                        <div class="linebox-anim open">
                            <div class="linebox-content">
                                <div class="table min">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <th colspan="1"><span>Dir</span></th>
                                                <th colspan="4"><span>Node sequence</span></th>
                                                <th colspan="4"><span>Stop sequence</span></th>
                                                <th colspan="1">&nbsp;</th>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>I</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat" alt="Show"><span class="material-icons">visibility_off</span></button></td>
                                            </tr>
                                            <tr>
                                                <th colspan="1"><span>R</span></th>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="4"><input type="text" placeholder="0"></td>
                                                <td colspan="1"><button class="btn icon flat active" alt="Hide"><span class="material-icons">visibility</span></button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="checker">
                                    <div></div>
                                    <button class="btn neuro"><span>Delete</span><span class="material-icons">delete</span></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="graph-container">
            </div>
        </div>
    </section>
    <div class="modal-container" style="display:none;">
        <div class="modal">
            <div class="modal-title">
                <h2>Add default transit lines</h2>
            </div>
            <div class="modal-content">
                <div class="default-lines">
                    <div class="default-line-row">
                        <div class="options">
                            <div class="mode">
                                <h4>Mode</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Bus 1</option>
                                </select>
                            </div>
                            <div class="type">
                                <h4>Type</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Tangential</option>
                                    <option>Diametral</option>
                                    <option>Radial</option>
                                    <option>Feeder</option>
                                </select>
                            </div>
                            <div class="zones">
                                <h4>Zone jumps</h4>
                                <div class="counter">
                                    <input type="number" class="number" placeholder="0">
                                    <button class="num plus"><span class="material-icons">arrow_drop_up</span></button>
                                    <button class="num less"><span class="material-icons">arrow_drop_down</span></button>
                                </div>
                            </div>
                            <div class="extension">
                                <h4>Extension</h4>
                                <label class="switch big">
                                    <input type="checkbox" checked="checked">
                                    <div class="switch-body">
                                        <span class="text-on">Large</span>
                                        <span class="text-off">Short</span>
                                    </div>
                                </label>
                            </div>
                            <div class="exclusive">
                                <h4>OD exclusive</h4>
                                <label class="switch big">
                                    <input type="checkbox" checked="checked">
                                    <div class="switch-body">
                                        <span class="text-on">Yes</span>
                                        <span class="text-off">No</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="flex end">
                            <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                        </div>
                    </div>
                    <div class="default-line-row">
                        <div class="options">
                            <div class="mode">
                                <h4>Mode</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Bus 1</option>
                                </select>
                            </div>
                            <div class="type">
                                <h4>Type</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Tangential</option>
                                    <option>Diametral</option>
                                    <option>Radial</option>
                                    <option>Feeder</option>
                                </select>
                            </div>
                            <div class="zones">
                                <h4>Zone jumps</h4>
                                <div class="counter">
                                    <input type="number" class="number" placeholder="0">
                                    <button class="num plus"><span class="material-icons">arrow_drop_up</span></button>
                                    <button class="num less"><span class="material-icons">arrow_drop_down</span></button>
                                </div>
                            </div>
                            <div class="extension">
                                <h4>Extension</h4>
                                <label class="switch big">
                                    <input type="checkbox" checked="checked">
                                    <div class="switch-body">
                                        <span class="text-on">Large</span>
                                        <span class="text-off">Short</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="flex end">
                            <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                        </div>
                    </div>
                    <div class="default-line-row">
                        <div class="options">
                            <div class="mode">
                                <h4>Mode</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Bus 1</option>
                                </select>
                            </div>
                            <div class="type">
                                <h4>Type</h4>
                                <select>
                                    <option selected disabled>Choose one</option>
                                    <option>Tangential</option>
                                    <option>Diametral</option>
                                    <option>Radial</option>
                                    <option>Feeder</option>
                                </select>
                            </div>
                            <div class="zones">
                                <h4>Zone jumps</h4>
                                <div class="counter">
                                    <input type="number" class="number" placeholder="0">
                                    <button class="num plus"><span class="material-icons">arrow_drop_up</span></button>
                                    <button class="num less"><span class="material-icons">arrow_drop_down</span></button>
                                </div>
                            </div>
                        </div>
                        <div class="flex end">
                            <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-base full">
                <div class="left-content">
                    <button class="btn">
                        <span class="material-icons">add</span>
                        <span>Add row</span>
                    </button>
                </div>
                <div class="right-content">
                    <button class="btn red"><span>Cancel</span></button>
                    <button class="btn"><span>Generate</span></button>
                </div>
            </div>
        </div>
    </div>
    <footer>
        <div class="container full grid">
            <div class="left-content">
                <button class="btn">
                    <span class="material-icons">add</span>
                    <span>Add new transit line</span>
                </button>
                <p class="info">30 total transit lines</p>
            </div>
            <div class="right-content">
                <button class="btn">
                    <span>Add default transit lines</span>
                    <span class="material-icons">format_list_bulleted</span>
                </button>
                <button class="btn">
                    <span>Save</span>
                    <span class="material-icons">chevron_right</span>
                </button>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'NewNetwork',
  components: {
    
  }
}
</script>
