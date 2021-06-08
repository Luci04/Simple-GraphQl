const RepoInfo = ({ repo }) => {

    let license;

    switch (repo.licenseInfo?.spdxid) {
        case undefined:
            license = (
                <span
                    className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger"
                    style={{ fontSize: ".9em", textAlign: "center" }}>
                    NO LICENSE
                </span>
            );
            break;
        case "NOASSERTION":
            license = (
                <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning"
                    style={{ fontSize: ".9em", textAlign: "center" }}>
                    {repo.licenseInfo.spdxid}
                </span>
            );
            break;
        default:
            license = (
                <span className="px-1 py-0 ms-1 d-inline-block btn btn-sm btn-success"
                    style={{ fontSize: ".9em", textAlign: "center" }}>
                    {repo.licenseInfo.spdxid}
                </span>
            );
    }

    return (
        <li className="list-group-item" key={repo.id.toString()} >
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <a className="h5 mb-0 text-decoration-none" href={repo.url}>
                        {repo.name}
                    </a>
                    <p className="small">
                        {repo.description}
                    </p>
                </div>
                <div className="text-nowrap ms-3">
                    {license}
                    <span
                        className={
                            "px-1 py-1 ms-1 w-5 d-inline-block btn btn-sm " +
                            (repo.viewerSubscription === "SUBSCRIBED" ? "btn-success" : "btn-outline-secondary")}
                        style={{ fontSize: ".5em", height: "25px", width: "350px", textAlign: "center" }}>
                        {repo.viewerSubscription}
                    </span>
                </div>
            </div>
        </li >
    );
}

export default RepoInfo;