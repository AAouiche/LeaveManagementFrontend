const ErrorPage = ({ onRetry }: { onRetry: () => void }) => {
    return (
        <div className="error-page">
            <h1>Something went wrong</h1>
            <p>We're having trouble loading the application. Please check your internet connection or try again later.</p>
            <button onClick={onRetry}>Retry</button>
        </div>
    );
};

export default ErrorPage;