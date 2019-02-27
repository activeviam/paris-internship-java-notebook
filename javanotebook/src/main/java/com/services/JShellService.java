package com.services;

import com.utils.JShellExecutor;

public interface JShellService {

	/**
	 * Creates a new {@link JShellExecutor jse} for a session.
	 *
	 * @param id the session token, unique to each notebook.
	 */
    void createJse(long id);

	/**
	 * Returns the {@link JShellExecutor jse} of the requested notebook, identified by session id.
	 *
	 * @param id The session id.
	 * @return The jse of the requested notebook, identified by session id.
	 */
	JShellExecutor getJse(long id);
	
	JShellExecutor getDefaultJSE();

	void restartJse(long id);
    
}