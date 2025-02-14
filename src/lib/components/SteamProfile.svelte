<script lang="ts">
    export let user: {
        steamid: string;
        personaname: string;
        avatarfull: string;
        profileurl: string;
        timecreated: number;
        loccountrycode: string;
        role: string;
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };
</script>

<div class="steam-profile">
    <div class="profile-header" style="background-image: url({user.avatarfull})">
        <div class="overlay"></div>
        <img src={user.avatarfull} alt={user.personaname} class="avatar" />
        <div class="user-info">
            <h1>{user.personaname}</h1>
            <div class="badges">
                <span class="badge role">{user.role}</span>
                <span class="badge country">{user.loccountrycode}</span>
            </div>
        </div>
    </div>
    <div class="profile-details">
        <div class="detail">
            <span class="label">Steam ID:</span>
            <span class="value">{user.steamid}</span>
        </div>
        <div class="detail">
            <span class="label">Member Since:</span>
            <span class="value">{formatDate(user.timecreated)}</span>
        </div>
        <a href={user.profileurl} target="_blank" class="steam-button">
            View Steam Profile
        </a>
    </div>
</div>

<style>
    .steam-profile {
        background: #1b2838;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        max-width: 600px;
        margin: 2rem auto;
    }

    .profile-header {
        position: relative;
        height: 200px;
        background-size: cover;
        background-position: center;
        padding: 20px;
        display: flex;
        align-items: flex-end;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(to bottom, transparent, rgba(27,40,56,0.9));
    }

    .avatar {
        width: 120px;
        height: 120px;
        border-radius: 8px;
        border: 4px solid #66c0f4;
        position: relative;
        z-index: 2;
    }

    .user-info {
        margin-left: 20px;
        position: relative;
        z-index: 2;
        color: white;
    }

    h1 {
        margin: 0;
        font-size: 2em;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }

    .badges {
        margin-top: 8px;
    }

    .badge {
        background: #66c0f4;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8em;
        margin-right: 8px;
        text-transform: uppercase;
    }

    .profile-details {
        padding: 20px;
        color: #acb2b8;
    }

    .detail {
        margin: 10px 0;
    }

    .label {
        color: #66c0f4;
        margin-right: 10px;
    }

    .steam-button {
        display: inline-block;
        background: #66c0f4;
        color: white;
        padding: 10px 20px;
        border-radius: 4px;
        text-decoration: none;
        margin-top: 15px;
        transition: background 0.2s;
    }

    .steam-button:hover {
        background: #417a9b;
    }
</style>
