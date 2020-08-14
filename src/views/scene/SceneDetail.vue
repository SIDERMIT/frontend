<template>
  <div class="SceneDetail">
    <div class="header">          
        <h1>Scene detail</h1>
        <span class="p-min">Created at</span>
    </div>
    <section class="city-details">
        <div class="graph-container">
        </div>
        <div>
            <div class="def-box">
                <h2>City parameters</h2>
                <div class="grid min">
                    <button class="btn"><span class="material-icons">chevron_right</span><span>View matrix parameters</span></button>
                    <button class="btn"><span class="material-icons">chevron_right</span><span>View matrix</span></button>
                </div>
            </div>
            <div>
                <div class="grid title">
                    <h2>User definition</h2>
                    <a class="link-icon"><span class="material-icons">help</span></a>
                </div>
                <div class="table">
                    <table>
                        <tbody>
                            <tr>
                                <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                                <th><span>𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                                <th><span>𝑠𝑝𝑣<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑤<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑎<br>[𝑈𝑆$/h]</span></th>
                                <th><span>𝑠𝑝𝑡<br>[𝐸𝐼𝑉]</span></th>
                            </tr>
                            <tr>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                                <td><input type="text" placeholder="0" value="0" disabled></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    <section class="transportation-mode">
        <div class="grid title">
            <h2>Transportation mode</h2>
            <a class="link-icon"><span class="material-icons">help</span></a>
        </div>
        <div class="table">
            <table>
                <tbody>
                    <tr>
                        <th><span>Mode</span></th>
                        <th><span>𝐶𝑜<br>[$/h−𝑣𝑒h]</span></th>
                        <th><span>𝐶1<br>[$/h−𝑝𝑎𝑥]</span></th>
                        <th><span>𝐶2<br>[$/h−𝑘𝑚]</span></th>
                        <th><span>𝜈<br>[𝑘𝑚/h]</span></th>
                        <th><span>B&A<br>Sequential</span></th>
                        <th><span>𝑡<br>[𝑠/𝑝𝑎𝑥]</span></th>
                        <th><span>fini<br>[veh/hr]</span></th>
                        <th><span>𝑓𝑚𝑎𝑥<br>[𝑣𝑒h/h]</span></th>
                        <th><span>𝐾𝑚𝑎𝑥<br>[𝑝𝑎𝑥/𝑣𝑒h]</span></th>
                        <th><span>𝜃</span></th>
                        <th><span>𝑡𝑎𝑡<br>[𝑚𝑖𝑛]</span></th>
                        <th><span>𝐷</span></th>
                        <th><span>𝑣𝑎<br>[𝑘𝑚/h]</span></th>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" checked disabled>
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                        <td><input type="text" placeholder="0" value="0" disabled></td>
                    </tr>
                    <tr>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td>
                            <label class="switch">
                                <input type="checkbox" checked>
                                <div class="switch-body">
                                </div>
                            </label>
                        </td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                        <td><input type="text" placeholder="0"></td>
                    </tr>
                </tbody>
            </table>
            <div class="checker">
                <div></div>
                <div class="grid min">
                    <button class="btn red"><span class="material-icons">close</span><span>Cancel</span></button>
                    <button class="btn"><span class="material-icons">check</span><span>Save mode</span></button>
                </div>
            </div>
        </div>
    </section>
    <section class="transportation-network">
        <h2>Transportation network</h2>
        <div class="subtitle">
            <h4>Configuration of transport modes and users for the city</h4>
        </div>
        <div class="table">
            <ul class="network-list">
                <li class="ok">
                    <div class="icon"><span class="material-icons">check_circle</span></div>
                    <div class="network-list-name">
                        <h4>Network 1 copy</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Processed</span>
                    </div>
                    <button class="btn neuro">
                        <span>View results</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="procesing">
                    <div class="loader">Loading...</div>
                    <div class="network-list-name">
                        <h4>Network 2 copy</h4>
                        <p><b>5 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Procesing...</span>
                    </div>
                    <button class="btn neuro">
                        <span>Cancel</span>
                        <span class="material-icons">close</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit" disabled><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="queued">
                    <div class="icon"><span class="material-icons">schedule</span></div>
                    <div class="network-list-name">
                        <h4>Network 2</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>In queued</span>
                    </div>
                    <button class="btn neuro">
                        <span>Remove</span>
                        <span class="material-icons">remove</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li>
                    <div class="icon"><span class="material-icons">more_horiz</span></div>
                    <div class="network-list-name">
                        <h4>Network 3</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Ready</span>
                    </div>
                    <button class="btn neuro">
                        <span>Process</span>
                        <span class="material-icons">add</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
                <li class="error">
                    <div class="icon"><span class="material-icons">error</span></div>
                    <div class="network-list-name">
                        <h4>Network 3 copy</h4>
                        <p><b>28 total networks</b> 13 tangential, 7 diametrial and 8 others</p>
                    </div>
                    <div class="status">
                        <span>Error</span>
                    </div>
                    <button class="btn neuro">
                        <span>View errors</span>
                        <span class="material-icons">chevron_right</span>
                    </button>
                    <div class="grid min">
                        <button class="btn icon" alt="Edit"><span class="material-icons">edit</span></button>
                        <button class="btn icon" alt="Duplicate"><span class="material-icons">file_copy</span></button>
                        <button class="btn icon" alt="Delete"><span class="material-icons">delete</span></button>
                    </div>
                </li>
            </ul>
        </div>
    </section>
    <footer>
        <div class="container full grid">
            <div class="left-content">
            </div>
            <div class="right-content">
                <a class="btn">
                    <span>View global results</span>
                    <span class="material-icons">chevron_right</span>
                </a>
                <router-link :to="{ name: 'NewScene'}" class="btn">
                    <span>Add new network</span>
                    <span class="material-icons">add</span>
                </router-link>
            </div>
        </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'SceneDetail',
  components: {
    
  }
}
</script>
